# Generated by Django 3.2.8 on 2022-04-30 13:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='companybaseinformation',
            name='place',
            field=models.CharField(default='', max_length=5),
        ),
    ]