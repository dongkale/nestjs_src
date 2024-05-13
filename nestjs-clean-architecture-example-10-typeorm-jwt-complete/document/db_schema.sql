CREATE TABLE `users_02` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT,    
    
    `username` varchar(255) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
    
    `password` text COLLATE utf8mb4_unicode_ci NULL,
    
    -- `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    -- `updated_at` timestamp NULL DEFAULT NULL,
    
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- CREATE TABLE `tasks_02` (
--     `id` bigint unsigned NOT NULL AUTO_INCREMENT,
    
--     `user_id` bigint unsigned NOT NULL,
    
--     `title` varchar(255) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
--     `description` varchar(255) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',
    
--     `status` varchar(128) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
    
--     PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `tasks_02` (    
	`id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    
    `user_id` bigint unsigned NOT NULL,
    
    `title` varchar(255) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
    `description` varchar(255) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',
    
    `status` varchar(128) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
    
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;