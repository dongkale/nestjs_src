CREATE TABLE `activity` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT,
    
    `timestamp` int NOT NULL DEFAULT '0',

    `owner_account_id` varchar(128) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
    `source_account_id` varchar(128) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
    `target_account_id` varchar(128) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    

    `amount` int NOT NULL DEFAULT '0',    
    
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT NULL,
    
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `account` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT,    
    
    `user_id` varchar(128) COLLATE utf8mb4_unicode_ci NULL DEFAULT '',    
    
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT NULL,
    
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;