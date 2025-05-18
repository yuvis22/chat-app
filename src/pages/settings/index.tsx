import { useState } from "react";
import { SignedIn, useUser } from "@clerk/nextjs";
import { MainLayout } from "@/components/layout/main-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BellRing, 
  Shield, 
  UserCircle, 
  Eye, 
  EyeOff,
  Save,
  Upload
} from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("profile");
  
  const [profileSettings, setProfileSettings] = useState({
    username: user?.username || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    bio: "Software developer passionate about creating great user experiences.",
    allowSearchByEmail: true,
    allowSearchByName: true,
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    newMessages: true,
    groupMessages: true,
    messageSent: false,
    messageRead: true,
    mentions: true,
    emailNotifications: false,
    soundEnabled: true,
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    readReceipts: true,
    lastSeen: true,
    onlineStatus: true,
    typingIndicators: true,
    endToEndEncryption: true,
    twoFactorAuth: false,
  });
  
  const handleProfileSave = () => {
    // In a real app, this would save to the backend
    toast.success("Profile settings saved");
  };
  
  const handleNotificationSave = () => {
    toast.success("Notification settings saved");
  };
  
  const handlePrivacySave = () => {
    toast.success("Privacy settings saved");
  };
  
  return (
    <SignedIn>
      <MainLayout>
        <div className="h-full flex flex-col overflow-hidden">
          <div className="p-4 border-b">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-sm text-muted-foreground">
              Manage your account preferences
            </p>
          </div>
          
          <div className="flex-1 overflow-auto p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <BellRing className="h-4 w-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="privacy" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Privacy</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="mt-6">
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user?.imageUrl || ""} />
                      <AvatarFallback className="text-xl">
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-medium mb-1">
                        {user?.fullName || "Your Name"}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {user?.primaryEmailAddress?.emailAddress || "email@example.com"}
                      </p>
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Change avatar
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Basic Information</h3>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={profileSettings.username}
                          onChange={(e) => setProfileSettings({...profileSettings, username: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileSettings.email}
                          onChange={(e) => setProfileSettings({...profileSettings, email: e.target.value})}
                          disabled
                        />
                        <p className="text-xs text-muted-foreground">
                          Email can only be changed in your Clerk account settings
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input
                          id="bio"
                          value={profileSettings.bio}
                          onChange={(e) => setProfileSettings({...profileSettings, bio: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Discovery Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="allow-search-name">Allow search by name</Label>
                          <p className="text-sm text-muted-foreground">
                            Let others find you by searching your name
                          </p>
                        </div>
                        <Switch
                          id="allow-search-name"
                          checked={profileSettings.allowSearchByName}
                          onCheckedChange={(checked) => 
                            setProfileSettings({...profileSettings, allowSearchByName: checked})
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="allow-search-email">Allow search by email</Label>
                          <p className="text-sm text-muted-foreground">
                            Let others find you by searching your email
                          </p>
                        </div>
                        <Switch
                          id="allow-search-email"
                          checked={profileSettings.allowSearchByEmail}
                          onCheckedChange={(checked) => 
                            setProfileSettings({...profileSettings, allowSearchByEmail: checked})
                          }
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={handleProfileSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save changes
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-6">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="new-messages">New messages</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when you receive new messages
                        </p>
                      </div>
                      <Switch
                        id="new-messages"
                        checked={notificationSettings.newMessages}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, newMessages: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="group-messages">Group messages</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified for new messages in group chats
                        </p>
                      </div>
                      <Switch
                        id="group-messages"
                        checked={notificationSettings.groupMessages}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, groupMessages: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="message-sent">Message sent</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when your messages are sent
                        </p>
                      </div>
                      <Switch
                        id="message-sent"
                        checked={notificationSettings.messageSent}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, messageSent: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="message-read">Message read</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when your messages are read
                        </p>
                      </div>
                      <Switch
                        id="message-read"
                        checked={notificationSettings.messageRead}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, messageRead: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="mentions">Mentions</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when you are mentioned in messages
                        </p>
                      </div>
                      <Switch
                        id="mentions"
                        checked={notificationSettings.mentions}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, mentions: checked})
                        }
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Methods</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, emailNotifications: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sound-enabled">Sound enabled</Label>
                        <p className="text-sm text-muted-foreground">
                          Play sounds for notifications
                        </p>
                      </div>
                      <Switch
                        id="sound-enabled"
                        checked={notificationSettings.soundEnabled}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, soundEnabled: checked})
                        }
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleNotificationSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save changes
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="privacy" className="mt-6">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Privacy Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="read-receipts">Read receipts</Label>
                        <p className="text-sm text-muted-foreground">
                          Let others know when you've read their messages
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {privacySettings.readReceipts ? (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        )}
                        <Switch
                          id="read-receipts"
                          checked={privacySettings.readReceipts}
                          onCheckedChange={(checked) => 
                            setPrivacySettings({...privacySettings, readReceipts: checked})
                          }
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="last-seen">Last seen</Label>
                        <p className="text-sm text-muted-foreground">
                          Show when you were last active
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {privacySettings.lastSeen ? (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        )}
                        <Switch
                          id="last-seen"
                          checked={privacySettings.lastSeen}
                          onCheckedChange={(checked) => 
                            setPrivacySettings({...privacySettings, lastSeen: checked})
                          }
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="online-status">Online status</Label>
                        <p className="text-sm text-muted-foreground">
                          Show when you're online
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {privacySettings.onlineStatus ? (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        )}
                        <Switch
                          id="online-status"
                          checked={privacySettings.onlineStatus}
                          onCheckedChange={(checked) => 
                            setPrivacySettings({...privacySettings, onlineStatus: checked})
                          }
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="typing-indicators">Typing indicators</Label>
                        <p className="text-sm text-muted-foreground">
                          Show when you're typing a message
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {privacySettings.typingIndicators ? (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        )}
                        <Switch
                          id="typing-indicators"
                          checked={privacySettings.typingIndicators}
                          onCheckedChange={(checked) => 
                            setPrivacySettings({...privacySettings, typingIndicators: checked})
                          }
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Security</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="end-to-end-encryption">End-to-end encryption</Label>
                        <p className="text-sm text-muted-foreground">
                          Encrypt your messages for maximum security
                        </p>
                      </div>
                      <Switch
                        id="end-to-end-encryption"
                        checked={privacySettings.endToEndEncryption}
                        onCheckedChange={(checked) => 
                          setPrivacySettings({...privacySettings, endToEndEncryption: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="two-factor-auth">Two-factor authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch
                        id="two-factor-auth"
                        checked={privacySettings.twoFactorAuth}
                        onCheckedChange={(checked) => 
                          setPrivacySettings({...privacySettings, twoFactorAuth: checked})
                        }
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handlePrivacySave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save changes
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </MainLayout>
    </SignedIn>
  );
}