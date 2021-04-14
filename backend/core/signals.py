from django.contrib.auth.models import User
from django.db.models.signals import pre_save
from django.dispatch import receiver


def updateUser(sender, instance, **kwargs):
    if instance.email == '':
        instance.email = instance.user


pre_save.connect(updateUser, sender=User)
