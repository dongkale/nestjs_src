CREATE TABLE `books` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT,    
    
    `title` varchar(128) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
    `author` varchar(128) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
    `quantity` smallint NULL DEFAULT 1,
    `description` varchar(512) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
    
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT NULL,
    
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;