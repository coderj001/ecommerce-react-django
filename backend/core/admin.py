from django.contrib import admin

from core.models import Order, OrderItem, Product, Review, ShippingAddress


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    pass


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    pass


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    pass


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    pass


@admin.register(ShippingAddress)
class ShippingAddressAdmin(admin.ModelAdmin):
    pass
