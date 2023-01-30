import string
import numpy as np

from django.http import Http404
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from rest_framework import viewsets, status
from rest_framework.response import Response

from shop.serializers import *
from shop.models import *


def page(request):
    return render(request, 'index.html')

def dress(request, dress_id):
    return render(request, 'index.html')


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'key'

    def list(self, request, *args, **kwargs):
        raise Http404

    def destroy(self, request, *args, **kwargs):
        raise Http404

    def create(self, request, *args, **kwargs):
        choice = list(string.ascii_lowercase + string.ascii_uppercase + string.digits)
        key = ''.join(np.random.choice(choice, 64))
        login = request.data['login']
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data['key'] = key
        if len(User.objects.filter(login=login)) > 0:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        key = kwargs.get('key')
        queryset = User.objects.get(key=key)
        serializer = UserSerializer(queryset)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        raise Http404


class UserIdViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserIdSerializer
    lookup_field = 'id'

    def list(self, request, *args, **kwargs):
        raise Http404

    def destroy(self, request, *args, **kwargs):
        raise Http404

    def create(self, request, *args, **kwargs):
        raise Http404

    def retrieve(self, request, *args, **kwargs):
        id = kwargs.get('id')
        queryset = User.objects.get(id=id)
        serializer = UserIdSerializer(queryset)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        raise Http404


class LoginViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = LoginSerializer

    def list(self, request, *args, **kwargs):
        raise Http404

    def retrieve(self, request, *args, **kwargs):
        raise Http404

    def destroy(self, request, *args, **kwargs):
        raise Http404

    def update(self, request, *args, **kwargs):
        raise Http404

    def create(self, request, *args, **kwargs):
        login = request.data['login']
        password = request.data['password']
        if User.objects.get(login=login).password == password:
            serializer = LoginSerializer(User.objects.get(login=login))
            return Response(serializer.data)
        else:
            serializer = LoginSerializer(User.objects.all())
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = SetReviewSerializer
    lookup_field = 'id'

    def list(self, request, *args, **kwargs):
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        user_key = request.data['user_key']
        user_id = request.data['user_id']
        dress_id = request.data['dress_id']
        print(request.data)
        if len(Review.objects.filter(user_id=user_id).filter(dress_id=dress_id)) > 0:
            return Response(status=status.HTTP_403_FORBIDDEN)
        if len(User.objects.filter(key=user_key)) == 0:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=request.data)
        print('*')
        serializer.is_valid(raise_exception=True)
        print('*')
        serializer.save()
        print('*')
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        user_key = request.data['user_key']
        id = kwargs.get('id')
        comment = request.data['comment']
        if len(User.objects.filter(key=user_key)) == 0:
            return Response(status=status.HTTP_403_FORBIDDEN)
        queryset = Review.objects.get(id=id)
        if queryset.user_key.key != user_key:
            return Response(status=status.HTTP_403_FORBIDDEN)
        queryset.comment = comment
        queryset.save()
        serializer = ReviewSerializer(queryset)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        user_key = request.data['user_key']
        id = kwargs.get('id')
        if len(User.objects.filter(key=user_key)) == 0:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        queryset = Review.objects.get(id=id)
        if queryset.user_key.key != user_key:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer = ReviewSerializer(queryset)
        queryset.delete()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        dress_id = kwargs.get('id')
        queryset = Review.objects.filter(dress_id=dress_id)
        serializer = ReviewSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
