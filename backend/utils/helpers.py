def priceLevel(priceInt):
    price = priceInt // 25  
    levels = ["PRICE_LEVEL_FREE", "PRICE_LEVEL_INEXPENSIVE", "PRICE_LEVEL_MODERATE", "PRICE_LEVEL_EXPENSIVE", "PRICE_LEVEL_VERY_EXPENSIVE"]
    return levels[min(max(price, 0), 4)]  
