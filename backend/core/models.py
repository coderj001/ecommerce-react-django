from django.contrib.auth.models import User
from django.db import models


class Product(models.Model):
    _id = models.AutoField(editable=False, primary_key=True)
    user = models.ForeignKey(
        User, related_name='product', on_delete=models.CASCADE)
    name = models.CharField(
        max_length=255, verbose_name='product name', blank=True, null=True)
    image = models.ImageField(blank=True, null=True)
    brand = models.CharField(
        max_length=255, verbose_name='product brand', blank=True, null=True)
    category = models.CharField(
        max_length=255, verbose_name='product category', blank=True, null=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2)
    numReview = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"

    def __str__(self):
        return self.name


class Review(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.SET_NULL, null=True, related_name='review')
    user = models.ForeignKey(
        User, related_name='review', on_delete=models.CASCADE)
    name = models.CharField(max_length=255,  blank=True, null=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    _id = models.AutoField(editable=False, primary_key=True)

    class Meta:
        verbose_name = "Review"
        verbose_name_plural = "Reviews"

    def __str__(self):
        return str(self.rating)


class Order(models.Model):
    user = models.ForeignKey(
        User, related_name='order', on_delete=models.CASCADE)
    paymentMethord = models.CharField(max_length=255, blank=True, null=True)
    taxPrice = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    isPaid = models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_now_add=False, blank=True, null=True)
    isDeliverd = models.BooleanField(default=False)
    deliverdAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(editable=False, primary_key=True)

    class Meta:
        verbose_name = "Order"
        verbose_name_plural = "Orders"

    def __str__(self):
        return str(self.createdAt)


class OrderItem(models.Model):
    product = models.ForeignKey(
        Product, related_name='orderitem',
        on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(
        Order, related_name='orderitem',
        on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


class ShippingAddress(models.Model):
    order = models.OneToOneField(
        Order, related_name='shippingaddress',
        on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.address)
