# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-02-14 08:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='hourly_rate',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
