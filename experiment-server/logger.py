"""Logging configuration"""
import logging

FORMAT = (
    '%(asctime)s %(levelname)s %(module)s:%(filename)s:%(lineno)d Function: %(funcName)s: %(exc_info)s %('
    'message)s')


def config(debug: bool = False) -> logging.Logger:
    """
    Set up a file logger and a console logger
    :return: configured logger for the web server
    """
    logger = logging.getLogger('autora_experiment_web')
    logger.setLevel(logging.DEBUG)

    fh = logging.FileHandler('autora_experiment_web.log')
    fh.setLevel(logging.DEBUG if debug else logging.WARN)
    fh.setFormatter(logging.Formatter(fmt=FORMAT))

    ch = logging.StreamHandler()
    ch.setLevel(logging.DEBUG if debug else logging.ERROR)
    ch.setFormatter(logging.Formatter(fmt=FORMAT))

    logger.addHandler(fh)
    logger.addHandler(ch)
    return logger
