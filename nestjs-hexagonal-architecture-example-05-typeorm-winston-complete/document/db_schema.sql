CREATE TABLE `products` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT,
    
    `name` varchar(128) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
    `description` varchar(128) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
    `image_url` varchar(128) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
    `price` int NULL DEFAULT 1,
    
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT NULL,
    
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;