CREATE TABLE `tickets` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT,
    
    `description` varchar(128) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
    `status` varchar(128) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
    `priority` smallint NULL DEFAULT 1,
    
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT NULL,
    
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;