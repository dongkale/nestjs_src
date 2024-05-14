CREATE TABLE `users_06` (
    `id` varchar(255) COLLATE utf8mb4_unicode_ci NULL DEFAULT '', 
    
    `email` varchar(255) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
    
    `password` text COLLATE utf8mb4_unicode_ci NULL,
    
    `role` text COLLATE utf8mb4_unicode_ci NULL,
    
    `hash_refresh_token` varchar(128) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',
    
    `last_login` timestamp NULL DEFAULT NULL,

    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT NULL
    
    -- PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;