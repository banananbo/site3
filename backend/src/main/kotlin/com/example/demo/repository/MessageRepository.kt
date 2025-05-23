package com.example.demo.repository

import com.example.demo.model.Message
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface MessageRepository : JpaRepository<Message, Long> {
    fun findFirstByOrderByIdAsc(): Message?
} 