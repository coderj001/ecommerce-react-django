from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer

from core.models import Order, OrderItem, Product, Review, ShippingAddress


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
