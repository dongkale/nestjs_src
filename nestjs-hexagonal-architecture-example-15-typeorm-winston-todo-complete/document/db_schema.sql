CREATE TABLE `todos_02` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT,    
    
    `title` varchar(128) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
    `content` varchar(128) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
    
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT NULL,
    `deleted_at` timestamp NULL DEFAULT NULL,
    
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;