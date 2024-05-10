CREATE TABLE `todos_ex` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT,
    
    `content` varchar(255) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
    
    `is_done` BOOLEAN  NULL DEFAULT 1,
    
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT NULL,
    
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `users` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT,
    
    `username` varchar(255) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
    
    `password` text COLLATE utf8mb4_unicode_ci NULL,
    
    `hach_refresh_token` varchar(128) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',
    
    `last_jogin_at` timestamp NULL DEFAULT NULL,

    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT NULL,
    
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;