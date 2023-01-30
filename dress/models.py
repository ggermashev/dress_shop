from django.db import models


class Dress(models.Model):
    title = models.CharField(max_length=64)
    img = models.ImageField(upload_to='photos/%Y/%m/%d/', null=True)
    price = models.IntegerField()
    description = models.CharField(max_length=512)
    slot_id = models.ForeignKey('Slot', on_delete=models.RESTRICT)
    likes = models.IntegerField(default=0, null=True)
    amount = models.IntegerField(default=0, null=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Одежда'
        verbose_name_plural = 'Одежда'


class Slot(models.Model):
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=512)


    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Слот'
        verbose_name_plural = 'Слоты'



