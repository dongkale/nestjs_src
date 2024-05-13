CREATE TABLE `users_03` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT,    
    
    `name` varchar(255) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
    `role` varchar(255) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',
    `email` varchar(255) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
    `password`  varchar(255) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',
    
    `active` BOOLEAN  NULL DEFAULT 1,
    
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT NULL,
    
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `messages_03` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT,    
    
    `user_id` bigint unsigned NOT NULL,
    
    `receiver_user_id` bigint unsigned NOT NULL,
    
    `content` varchar(255) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',
    
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT NULL,
    
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;