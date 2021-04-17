from django.urls import path

from core.views import (MyTokenObtainPairView, getProduct, getProducts,
                        getUserProfile, getUsers, registerUser,
                        updateUserProfile)

APP_NAME = 'core'

urlpatterns = [
    # user urls - auth
    path('users/login/', MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('users/register/', registerUser, name="user-register"),
    path('users/profile/', getUserProfile, name="user-profile"),
    path('users/profile/update/', updateUserProfile, name="user-profile-update"),
    path('users/', getUsers, name="users"),

    # products urls
    path('products/', getProducts, name="get-products"),
    path('product/<int:id>/', getProduct, name="get-product"),

    # orders urls
]
