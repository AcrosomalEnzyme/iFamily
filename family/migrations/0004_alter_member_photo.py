# Generated by Django 3.2.8 on 2022-04-20 09:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('family', '0003_alter_member_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='photo',
            field=models.FileField(default='image/member_photo/default_photo.png', upload_to='image/member_photo/'),
        ),
    ]