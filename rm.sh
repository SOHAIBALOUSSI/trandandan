#!/bin/bash

rm server/auth-service/auth.db.sqlite && \
rm server/relationships-service/relationships.db.sqlite && \
rm server/profile-service/profile.db.sqlite
rm server/notifications-service/notifications.db.sqlite
