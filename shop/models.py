from django.db import models
from dress.models import *


class User(models.Model):
    name = models.CharField(max_length=64)
    surname = models.CharField(max_length=64)
    login = models.CharField(max_length=128)
    password = models.CharField(max_length=128)
    balance = models.IntegerField(default=0, null=True)
    key = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return self.login

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'


class Review(models.Model):
    user_id = models.ForeignKey('User', to_field='id', related_name='user_id', on_delete=models.CASCADE)
    user_key = models.ForeignKey('User', to_field='key', related_name='user_key', on_delete=models.CASCADE, default='')
    dress_id = models.ForeignKey('dress.Dress', on_delete=models.CASCADE)
    comment = models.CharField(max_length=1024)
    likes = models.IntegerField(default=0, null=True)

    def __str__(self):
        return self.comment

    class Meta:
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'
        unique_together = ('user_id', 'dress_id',)


class Basket(models.Model):
    user_key = models.ForeignKey('User', to_field='key', on_delete=models.CASCADE)
    dress_id = models.ForeignKey('dress.Dress', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Корзина'
        verbose_name_plural = 'Корзина'

