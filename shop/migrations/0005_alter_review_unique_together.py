# Generated by Django 4.1.3 on 2023-02-07 13:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dress', '0002_alter_dress_options_alter_slot_options'),
        ('shop', '0004_alter_review_user_id_alter_review_user_key'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='review',
            unique_together={('user_id', 'dress_id')},
        ),
    ]
