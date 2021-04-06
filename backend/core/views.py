from rest_framework.decorators import api_view
from rest_framework.response import Response

from core.models import Order, OrderItem, Product, Review, ShippingAddress
from core.serializer import ProductSerializer


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, id):
    product = Product.objects.get(pk=id)
    serializer = ProductSerializer(product)
    return Response(serializer.data)
