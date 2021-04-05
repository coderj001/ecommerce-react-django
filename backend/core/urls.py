from django.urls import path
from core.views import getProducts, getProduct

APP_NAME = 'core'

urlpatterns = [
    path('products/', getProducts, name="get-products"),
    path('product/<int:id>/', getProduct, name="get-product"),
]
