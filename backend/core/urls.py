from django.urls import path

from core.views import (MyTokenObtainPairView, getProduct, getProducts,
                        getUserProfile)

APP_NAME = 'core'

urlpatterns = [
    path('users/login/', MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('users/profile/', getUserProfile, name="user-profile"),
    path('products/', getProducts, name="get-products"),
    path('product/<int:id>/', getProduct, name="get-product"),
]
