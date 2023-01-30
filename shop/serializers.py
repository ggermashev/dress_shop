from rest_framework import serializers
from shop.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'surname', 'login', 'password', 'balance', 'id')


class UserIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'surname', 'id')


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('login', 'password', 'key')


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'user_id', 'dress_id', 'comment')


class SetReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'user_id', 'dress_id', 'comment', 'user_key')



