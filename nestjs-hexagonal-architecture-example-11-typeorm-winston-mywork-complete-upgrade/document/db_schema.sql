CREATE TABLE `todos_07` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT,
    
    `content` varchar(512) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    

    `is_done` tinyint NOT NULL DEFAULT '0',
    
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT NULL,
    
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;