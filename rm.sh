#!/bin/bash

echo "removing db files ..."
rm server/auth-service/auth.db.sqlite
echo "removed auth db file"
rm server/relationships-service/relationships.db.sqlite 
echo "removed relationships db file"
rm server/profile-service/profile.db.sqlite
echo "removed profile db file"
rm server/notifications-service/notifications.db.sqlite
echo "removed notifications db file"
rm server/chat-service/messages.db.sqlite
echo "removed chat db file"
rm server/game-service/db/game.db.sqlite
echo "removed game db file"
