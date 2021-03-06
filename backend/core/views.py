from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework_simplejwt.views import TokenObtainPairView

from core.models import (
    Order,
    OrderItem,
    Product,
    Review,
    ShippingAddress
)
from core.serializer import (
    MyTokenObtainPairSerializer,
    ProductSerializer,
    UserSerializer,
    UserSerializerWithToken,
    OrderSerializer
)

# Users views


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    data = request.data
    first_name = data.get('name')
    username = data.get('email')
    password = data.get('password')

    user.first_name = first_name

    if username:
        user.username = username
    if password != '':
        user.set_password(password)
    user.save()
    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data.get('name'),
            username=data.get('email'),
            email=data.get('email')
        )
        user.set_password(data.get('password'))
        user.save()
        serializer = UserSerializerWithToken(user)
        return Response(serializer.data)
    except Exception as e:
        message = {'detail': 'User with this email alrady exists.'}
        return Response(message, status=HTTP_400_BAD_REQUEST)

# Users views - end

# Products views


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

# Products views - end

# Order views


@api_view(['POST'])
@permission_classes(['IsAuthenticated'])
def addOrderItem(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response(
            {'detail': 'No Order Items'},
            status=HTTP_400_BAD_REQUEST
        )
    else:
        # (1): Create Order
        order = Order.objects.create(
            user=user,
            paymentMethord=data.get('paymentMethord'),
            taxPrice=data.get('taxPrice'),
            shippingPrice=data.get('shippingPrice'),
            totalPrice=data.get('totalPrice')
        )
        # (2): Shipping Address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data.get('shippingAddress').get('address'),
            city=data.get('shippingAddress').get('city'),
            pincode=data.get('shippingAddress').get('pincode'),
            country=data.get('shippingAddress').get('country'),
        )
        # (3): Create OrderItem and set order to orderItems relationship
        for item in orderItems:
            product = Product.objects.get(_id=item.get('product'))
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=item.get('qtn'),
                price=item.get('price'),
                image=product.image.url
            )

            # (4) Update Stock

            product.countInStock -= item.qty
            product.save()

    serializer = OrderSerializer(order, many=True)

    return Response(serializer.data)


# Order views - end
