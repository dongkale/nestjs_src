CREATE TABLE `auctions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,

  `auction_id` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,

  `started` timestamp NULL DEFAULT NULL,
  `end` timestamp NULL DEFAULT NULL,

  `higher_bid` bigint unsigned NOT NULL COMMENT 'members 테이블 id',
  `higher_bidder_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,

  `history` JSON,

  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,

  PRIMARY KEY (`id`)  
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;