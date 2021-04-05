from rest_framework.decorators import api_view
from rest_framework.response import Response

from .product import PRODUCT


@api_view(['GET'])
def getProducts(request):
    products = PRODUCT
    return Response(products)


@api_view(['GET'])
def getProduct(request, id):
    product = PRODUCT[id-1]
    return Response(product)
