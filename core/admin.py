from django.contrib import admin
from .models import (
    About,
    Skill,
    Project,
    Experience,
    Service,
    Blog,
    Testimonial,
    Message,
    Media,
)


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ("name", "title", "email", "location")


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "proficiency", "is_published")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "created_at")


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("company", "role", "start_date", "end_date", "is_current")


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "is_published")


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "status", "created_at")
    list_filter = ("status",)
    search_fields = ("title", "slug", "content")


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "is_published")


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "is_read", "created_at")


@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):
    list_display = ("file", "uploaded_at")