from django.apps import AppConfig


class CoreConfig(AppConfig):
    name = 'core'

    def redy(self):
        import core.signals
