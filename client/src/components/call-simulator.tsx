import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone,
  PhoneOff,
  Clock,
  MessageCircle,
  MicOff,
  Volume2,
  Plus,
  Video,
  Users,
  Signal,
  Wifi,
  Battery,
} from "lucide-react";
// import ringtone from "/assets/iphone_call.mp3";
import ringtone from "../../assets/iphone_call.mp3";

type CallState = "setup" | "incoming" | "active";

interface Contact {
  name: string;
  emoji: string;
}

const presetContacts: Contact[] = [
  { name: "Mom", emoji: "👩‍🦳" },
  { name: "Boss", emoji: "👔" },
  { name: "Doctor", emoji: "🩺" },
  { name: "Emergency", emoji: "🚨" },
];

const contactAvatars = [
  "https://images.unsplash.com/photo-1494790108755-2616b612b5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
  "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
];

export default function CallSimulator() {
  const [callState, setCallState] = useState<CallState>("setup");
  const [contactName, setContactName] = useState("");
  const [callDuration, setCallDuration] = useState(0);
  const [contactAvatar, setContactAvatar] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (callState === "incoming" && audioRef.current) {
      console.log(audioRef.current);
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [callState]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const startCall = () => {
    if (!contactName.trim()) return;

    // Set random avatar
    const randomAvatar =
      contactAvatars[Math.floor(Math.random() * contactAvatars.length)];
    setContactAvatar(randomAvatar);

    setCallState("incoming");
  };

  const answerCall = () => {
    setCallState("active");
    setCallDuration(0);

    // Start timer
    intervalRef.current = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
  };

  const endCall = () => {
    setCallState("setup");
    setCallDuration(0);
    setContactName("");

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        endCall();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  if (callState === "setup") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ios-light-gray via-white to-ios-light-gray flex flex-col">
        {/* Header */}
        <header className="text-center py-8 px-6">
          <h1 className="text-3xl font-bold ios-blue mb-2">FakeiPhoneCalls</h1>
          <p className="ios-gray text-sm">
            The perfect excuse - realistic iPhone call simulator
          </p>
        </header>

        {/* Main Setup Form */}
        <div className="flex-1 flex flex-col justify-center px-6 max-w-md mx-auto w-full">
          {/* Contact Input Section */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Create Your Fake Call
              </h2>

              {/* Contact Name Input */}
              <div className="mb-4">
                <Label className="text-sm font-medium ios-gray mb-2">
                  Contact Name
                </Label>
                <Input
                  type="text"
                  placeholder="Enter contact name..."
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="text-lg bg-ios-light-gray border-gray-200 focus:border-ios-blue"
                  maxLength={30}
                />
              </div>

              {/* Preset Contacts */}
              <div className="mb-6">
                <Label className="text-sm font-medium ios-gray mb-3">
                  Quick Presets
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {presetContacts.map((contact) => (
                    <Button
                      key={contact.name}
                      variant="outline"
                      className="px-3 py-2 bg-ios-light-gray text-sm font-medium ios-blue border-none hover:bg-gray-200"
                      onClick={() => setContactName(contact.name)}
                    >
                      {contact.emoji} {contact.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Call Me Now Button */}
              <Button
                className="w-full bg-ios-blue text-white py-4 text-lg font-semibold shadow-lg transform transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
                onClick={startCall}
                disabled={!contactName.trim()}
              >
                📞 Call Me Now
              </Button>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">How it works:</h3>
              <ol className="text-sm ios-gray space-y-2">
                <li>1. Enter a contact name or use a preset</li>
                <li>2. Tap "Call Me Now" to start the fake call</li>
                <li>3. Show your phone screen to others</li>
                <li>4. Say "Sorry, I have to take this" and walk away</li>
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="text-center py-6 px-6">
          <p className="text-xs ios-gray">
            Free forever • No app required • Works on any device
          </p>
        </footer>
      </div>
    );
  }

  if (callState === "incoming") {
    return (
      <div className="fixed inset-0 bg-ios-call-bg text-white z-50 slide-up active">
        <audio ref={audioRef} src={ringtone} loop controls />
        {/* Status Bar */}
        <div className="flex justify-between items-center px-6 pt-12 pb-4 text-white">
          <span className="text-sm font-medium">Verizon</span>
          <span className="text-sm font-medium">{getCurrentTime()}</span>
          <div className="flex items-center space-x-1">
            <Signal className="w-4 h-4" />
            <Wifi className="w-4 h-4" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Incoming Call Label */}
        <div className="text-center mt-8 mb-4">
          <p className="text-sm text-gray-300">incoming call</p>
        </div>

        {/* Contact Info */}
        <div className="text-center px-6 mb-12">
          {/* Contact Avatar with Pulse Ring */}
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-white rounded-full pulse-ring"></div>
            <img
              src={contactAvatar}
              alt="Contact Avatar"
              className="w-32 h-32 rounded-full border-4 border-white contact-glow relative z-10 object-cover"
            />
          </div>

          {/* Contact Name */}
          <h2 className="text-3xl font-light mb-2">{contactName}</h2>

          {/* Phone Number */}
          <p className="text-lg text-gray-300">+1 (555) 123-4567</p>
        </div>

        {/* Call Actions */}
        <div className="absolute bottom-20 left-0 right-0 px-6">
          {/* Secondary Actions Row */}
          <div className="flex justify-between items-center mb-8 px-8">
            {/* Remind Me */}
            <Button className="w-14 h-14 bg-gray-800 bg-opacity-50 rounded-full p-0 hover:bg-gray-700">
              <Clock className="text-white w-6 h-6" />
            </Button>

            {/* Message */}
            <Button className="w-14 h-14 bg-gray-800 bg-opacity-50 rounded-full p-0 hover:bg-gray-700">
              <MessageCircle className="text-white w-6 h-6" />
            </Button>
          </div>

          {/* Primary Actions Row */}
          <div className="flex justify-between items-center px-4">
            {/* Decline Button */}
            <Button
              onClick={endCall}
              className="w-20 h-20 bg-ios-red rounded-full p-0 call-button-shadow transform transition-transform duration-150 active:scale-95 hover:bg-red-600"
            >
              <PhoneOff className="text-white w-8 h-8" />
            </Button>

            {/* Answer Button */}
            <Button
              onClick={answerCall}
              className="w-20 h-20 bg-ios-green rounded-full p-0 call-button-shadow transform transition-transform duration-150 active:scale-95 hover:bg-green-600"
            >
              <Phone className="text-white w-8 h-8" />
            </Button>
          </div>

          {/* Slide to Answer Hint */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">slide to answer</p>
          </div>
        </div>
      </div>
    );
  }

  if (callState === "active") {
    return (
      <div className="fixed inset-0 bg-ios-call-bg text-white z-50 slide-up active">
        {/* Status Bar */}
        <div className="flex justify-between items-center px-6 pt-12 pb-4 text-white">
          <span className="text-sm font-medium ios-green">
            <Phone className="inline w-3 h-3 mr-1" />
            Call {formatTime(callDuration)}
          </span>
          <span className="text-sm font-medium">{getCurrentTime()}</span>
          <div className="flex items-center space-x-1">
            <Signal className="w-4 h-4" />
            <Wifi className="w-4 h-4" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center px-6 mt-16 mb-12">
          {/* Contact Avatar */}
          <img
            src={contactAvatar}
            alt="Contact Avatar"
            className="w-32 h-32 rounded-full border-4 border-white contact-glow mx-auto mb-6 object-cover"
          />

          {/* Contact Name */}
          <h2 className="text-3xl font-light mb-2">{contactName}</h2>

          {/* Call Duration */}
          <p className="text-lg text-gray-300 call-timer">
            {formatTime(callDuration)}
          </p>
        </div>

        {/* Call Controls */}
        <div className="absolute bottom-20 left-0 right-0 px-6">
          {/* First Row */}
          <div className="grid grid-cols-3 gap-6 mb-8 px-4">
            {/* Mute */}
            <Button className="w-16 h-16 bg-gray-800 bg-opacity-50 rounded-full flex flex-col items-center justify-center p-0 hover:bg-gray-700">
              <MicOff className="text-white w-6 h-6 mb-1" />
              <span className="text-xs text-gray-300">mute</span>
            </Button>

            {/* Keypad */}
            <Button className="w-16 h-16 bg-gray-800 bg-opacity-50 rounded-full flex flex-col items-center justify-center p-0 hover:bg-gray-700">
              <div className="grid grid-cols-3 gap-0.5 w-5 h-5 mb-1">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
                ))}
              </div>
              <span className="text-xs text-gray-300">keypad</span>
            </Button>

            {/* Speaker */}
            <Button className="w-16 h-16 bg-gray-800 bg-opacity-50 rounded-full flex flex-col items-center justify-center p-0 hover:bg-gray-700">
              <Volume2 className="text-white w-6 h-6 mb-1" />
              <span className="text-xs text-gray-300">speaker</span>
            </Button>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-3 gap-6 mb-8 px-4">
            {/* Add Call */}
            <Button className="w-16 h-16 bg-gray-800 bg-opacity-50 rounded-full flex flex-col items-center justify-center p-0 hover:bg-gray-700">
              <Plus className="text-white w-6 h-6 mb-1" />
              <span className="text-xs text-gray-300">add call</span>
            </Button>

            {/* FaceTime */}
            <Button className="w-16 h-16 bg-gray-800 bg-opacity-50 rounded-full flex flex-col items-center justify-center p-0 hover:bg-gray-700">
              <Video className="text-white w-6 h-6 mb-1" />
              <span className="text-xs text-gray-300">FaceTime</span>
            </Button>

            {/* Contacts */}
            <Button className="w-16 h-16 bg-gray-800 bg-opacity-50 rounded-full flex flex-col items-center justify-center p-0 hover:bg-gray-700">
              <Users className="text-white w-6 h-6 mb-1" />
              <span className="text-xs text-gray-300">contacts</span>
            </Button>
          </div>

          {/* End Call Button */}
          <div className="text-center">
            <Button
              onClick={endCall}
              className="w-20 h-20 bg-ios-red rounded-full p-0 call-button-shadow transform transition-transform duration-150 active:scale-95 hover:bg-red-600"
            >
              <PhoneOff className="text-white w-8 h-8" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
