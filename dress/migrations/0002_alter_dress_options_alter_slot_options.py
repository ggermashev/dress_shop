# Generated by Django 4.1.4 on 2022-12-29 17:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dress', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='dress',
            options={'verbose_name': 'Одежда', 'verbose_name_plural': 'Одежда'},
        ),
        migrations.AlterModelOptions(
            name='slot',
            options={'verbose_name': 'Слот', 'verbose_name_plural': 'Слоты'},
        ),
    ]
