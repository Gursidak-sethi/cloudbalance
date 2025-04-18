package com.example.cloudbalance.cloudbalance_backend.services.UserDetailsService;

import com.example.cloudbalance.cloudbalance_backend.entities.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Collections;

@Getter
public class UserDetailsImpl implements UserDetails {
    private Long userId;
    private String username;
    @JsonIgnore
    private String password;
    private GrantedAuthority authority;

    public UserDetailsImpl(Long id, String name,String pass, GrantedAuthority authority){
        this.userId=id;
        this.username=name;
        this.password=pass;
        this.authority = authority;
    }

    public static UserDetailsImpl build(User user){
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().name());
        return new UserDetailsImpl(
          user.getUserId(),
          user.getUsername(),
          user.getPassword(),
          authority
        );
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(authority);
    }
    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public String toString() {
        return super.toString();
    }
}
