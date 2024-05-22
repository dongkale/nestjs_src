CREATE TABLE `members` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT,
    
    `name` varchar(128) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
    `email` varchar(128) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
    `phone` varchar(128) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
    
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT NULL,
    
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;