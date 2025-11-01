from rest_framework import serializers
from .models import *


class ProjectSerializer(serializers.ModelSerializer):
    PM_name= serializers.SerializerMethodField()
    class Meta:
        model = Project
        fields  = ['id','name', 'start_date','end_date','comments','status', 'PM_name', 'project_manager']

    # create a name field instead of the default id one 
    def get_PM_name(self, obj):
        return obj.project_manager.name if obj.project_manager else None

class ProjectManagerSerializer(serializers.ModelSerializer):
    class Meta: 
        model = ProjectManager
        fields = ['id', 'name', 'projects']

 