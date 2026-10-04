from rest_framework.permissions import BasePermission


class IsAdminOrReadOnly(BasePermission):
    """
    Anyone can view public content.
    Only authenticated admin/staff users can create,
    update, or delete content.
    """

    def has_permission(self, request, view):

        # Public read access
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True

        # Write access only for authenticated admin/staff users
        return (
            request.user
            and request.user.is_authenticated
            and request.user.is_staff
        )
    