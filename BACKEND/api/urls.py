from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter


router = DefaultRouter()

router.register('project', ProjectViewset, basename='project')
router.register('project_manager', ProjectManagerViewset, basename='project_manager')

urlpatterns = router.urls

# urlpatterns = [
#     path('', home),

# ]