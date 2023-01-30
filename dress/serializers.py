from rest_framework import serializers
from dress.models import *


class DressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dress
        fields = "__all__"


class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = "__all__"

