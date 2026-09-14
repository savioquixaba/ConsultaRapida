package com.consultarapida.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.annotation.Order;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Order(1)
public class RateLimitFilter extends OncePerRequestFilter {

    private static final int API_LIMIT = 30;
    private static final long API_WINDOW_MS = 60_000L;
    private static final int LOGIN_LIMIT = 10;
    private static final long LOGIN_WINDOW_MS = 60_000L;

    private final Map<String, Deque<Long>> apiHits = new ConcurrentHashMap<>();
    private final Map<String, Deque<Long>> loginHits = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String path = request.getRequestURI();

        if (path.startsWith("/api/")) {
            if (!allow(apiHits, clientKey(request), API_LIMIT, API_WINDOW_MS)) {
                reject(response, "Muitas consultas. Aguarde um minuto.");
                return;
            }
        }

        if ("/login".equals(path) && "POST".equalsIgnoreCase(request.getMethod())) {
            if (!allow(loginHits, clientKey(request), LOGIN_LIMIT, LOGIN_WINDOW_MS)) {
                reject(response, "Muitas tentativas de login. Aguarde um minuto.");
                return;
            }
        }

        chain.doFilter(request, response);
    }

    private String clientKey(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    private synchronized boolean allow(Map<String, Deque<Long>> store, String key, int limit, long windowMs) {
        long now = System.currentTimeMillis();
        Deque<Long> hits = store.computeIfAbsent(key, k -> new ArrayDeque<>());
        while (!hits.isEmpty() && now - hits.peekFirst() > windowMs) {
            hits.pollFirst();
        }
        if (hits.size() >= limit) {
            return false;
        }
        hits.addLast(now);
        return true;
    }

    private void reject(HttpServletResponse response, String message) throws IOException {
        response.setStatus(429);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write("{\"erro\":\"" + message + "\"}");
    }
}
