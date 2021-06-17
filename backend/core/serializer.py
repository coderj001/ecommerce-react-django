from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from core.models import (
    Order,
    OrderItem,
    Product,
    Review,
    ShippingAddress
)


# Users Serializer
class UserSerializer(ModelSerializer):
    _id = SerializerMethodField(read_only=True)
    isAdmin = SerializerMethodField(read_only=True)

    class Meta:
        model = get_user_model()
        fields = ('_id', 'username', 'email', 'isAdmin')

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff


class UserSerializerWithToken(UserSerializer):
    token = SerializerMethodField(read_only=True)

    class Meta:
        model = get_user_model()
        fields = ('_id', 'username', 'email', 'isAdmin', 'token')

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data

# Users Serializer - end

# Product Serializer


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
# Product Serializer - end
