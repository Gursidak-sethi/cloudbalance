package com.example.cloudbalance.cloudbalancebackend.configs.filters;

import com.example.cloudbalance.cloudbalancebackend.exceptions.customexceptions.InvalidTokenException;
import com.example.cloudbalance.cloudbalancebackend.exceptions.customexceptions.TokenExpiredException;
import com.example.cloudbalance.cloudbalancebackend.exceptions.customexceptions.UnauthorizedException;
import com.example.cloudbalance.cloudbalancebackend.repositories.BlacklistTokenRepository;
import com.example.cloudbalance.cloudbalancebackend.services.JwtService;
import com.example.cloudbalance.cloudbalancebackend.services.userdetailsservice.UserDetailsServiceImpl;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsService;
    private final BlacklistTokenRepository blacklistTokenRepository;

    public JWTFilter(JwtService jwtService, UserDetailsServiceImpl userDetailsService, BlacklistTokenRepository blacklistTokenRepository) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.blacklistTokenRepository=blacklistTokenRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = parseJwt(request);
            if (jwt == null) {
                filterChain.doFilter(request, response);
                return;
            }

            // Check if the token is blacklisted (revoked)
            if (blacklistTokenRepository.existsByToken(jwt)) {
                throw new UnauthorizedException("Token has been revoked");
            }

            String username = jwtService.extractUsername(jwt);
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                // Validate JWT token
                if (jwtService.validateJwtToken(jwt)) {
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    throw new UnauthorizedException("Invalid Token");
                }
            }

        } catch (ExpiredJwtException e) {
            logger.error("JWT Token has expired: " + e.getMessage());
            throw new TokenExpiredException("JWT Token has expired. Please login again.");
        } catch (InvalidTokenException e) {
            logger.error("Invalid JWT Token: " + e.getMessage());
            throw new InvalidTokenException("Invalid Token. Please check your token and try again.");
        } catch (Exception e) {
            logger.error("JWT authentication failed: " + e.getMessage());
            throw new UnauthorizedException( "JWT authentication failed: " + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    // Extract JWT from Authorization header
    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }

        return null;
    }
}
