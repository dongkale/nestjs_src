CREATE TABLE `dummys` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT,    
    
    `value` varchar(255) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',
    
    -- `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    -- `updated_at` timestamp NULL DEFAULT NULL,
    
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;