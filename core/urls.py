from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    AboutViewSet,
    SkillViewSet,
    ProjectViewSet,
    ExperienceViewSet,
    ServiceViewSet,
    BlogViewSet,
    TestimonialViewSet,
    MessageViewSet,
    MediaViewSet,
)

router = DefaultRouter()

router.register('about', AboutViewSet, basename='about')
router.register('skills', SkillViewSet, basename='skills')
router.register('projects', ProjectViewSet, basename='projects')
router.register('experience', ExperienceViewSet, basename='experience')
router.register('services', ServiceViewSet, basename='services')
router.register('blogs', BlogViewSet, basename='blogs')
router.register('testimonials', TestimonialViewSet, basename='testimonials')
router.register('messages', MessageViewSet, basename='messages')
router.register('media', MediaViewSet, basename='media')

urlpatterns = [
    path('', include(router.urls)),
]