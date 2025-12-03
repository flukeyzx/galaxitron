import { useState, useRef, useCallback, useEffect } from "react";
import { Camera, Mail, Lock, User as UserIcon, Save, X } from "lucide-react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    console.log("Profile Image changed: ", profileImage);
  }, [profileImage]);

  useEffect(() => {
    console.log("Zoom changed: ", zoom);
  }, [zoom]);

  useEffect(() => {
    console.log("Crop changed: ", crop);
  }, [crop]);

  useEffect(() => {
    console.log("Cropped Area Pixels changed: ", croppedAreaPixels);
  }, [croppedAreaPixels]);

  useEffect(() => {
    console.log("Show Cropper changed: ", showCropper);
  }, [showCropper]);

  useEffect(() => {
    console.log("Temp Image changed: ", tempImage);
  }, [tempImage]);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTempImage(reader.result);
        setShowCropper(true);
        setZoom(1);
        setCrop({ x: 0, y: 0 });
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    console.log("Hitting onCropComplete");
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });

  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob));
        }
      }, "image/jpeg");
    });
  };

  const handleCropSave = async () => {
    try {
      const croppedImage = await getCroppedImg(tempImage, croppedAreaPixels);
      setProfileImage(croppedImage);
      setShowCropper(false);
      setTempImage(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saving profile:", formData);
    // Add save logic here
  };

  return (
    <div className="h-screen">
      <div className="pt-20 flex flex-col items-center justify-center xl:px-20 px-10 max-lg:px-8">
        <div className="w-full mb-6 ml-4">
          <h1 className="text-4xl font-bold gradient-heading mb-2">
            Profile Settings
          </h1>
          <p className="text-foreground/60">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 flex items-stretch">
            <div className="w-full bg-[rgba(13,25,48,0.4)] backdrop-blur-md rounded-2xl border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 flex flex-col justify-center">
              <h2 className="text-xl font-semibold mb-6 text-center">
                Profile Picture
              </h2>

              <div className="flex flex-col items-center space-y-4">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative group cursor-pointer"
                >
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary/30 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-primary/40 to-secondary/40 flex items-center justify-center">
                        <UserIcon className="w-24 h-24 text-white/60" />
                      </div>
                    )}
                  </div>

                  <button className="cursor-pointer absolute bottom-2 right-2 bg-primary hover:bg-primary/90 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />

                <p className="text-sm text-foreground/60 text-center">
                  Click the camera icon to upload
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 flex items-stretch">
            <div className="w-full bg-[rgba(13,25,48,0.4)] backdrop-blur-md rounded-2xl border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold mb-6">
                    Personal Information
                  </h2>

                  <div className="space-y-5 flex-1">
                    <div>
                      <Label
                        htmlFor="name"
                        className="mb-2 pl-2 text-foreground/80"
                      >
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        icon={<UserIcon className="w-5 h-5" />}
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="email"
                        className="mb-2 pl-2 text-foreground/80"
                      >
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        icon={<Mail className="w-5 h-5" />}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold mb-6">
                    Change Password
                  </h2>

                  <div className="space-y-5 flex-1">
                    <div>
                      <Label
                        htmlFor="currentPassword"
                        className="mb-2 pl-2 text-foreground/80"
                      >
                        Current Password
                      </Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        icon={<Lock className="w-5 h-5" />}
                        placeholder="Enter current password"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="newPassword"
                        className="mb-2 pl-2 text-foreground/80"
                      >
                        New Password
                      </Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        icon={<Lock className="w-5 h-5" />}
                        placeholder="Enter new password"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="confirmPassword"
                        className="mb-2 pl-2 text-foreground/80"
                      >
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        icon={<Lock className="w-5 h-5" />}
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-end mt-8 pt-6 border-t border-white/10">
                <Button
                  variant="outline"
                  size={"md"}
                  className="rounded-3xl w-42"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </Button>
                <Button
                  variant="gradient"
                  onClick={handleSave}
                  size={"md"}
                  className="w-42 hover:scale-none hover:opacity-80"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCropper && tempImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[rgba(13,25,48,0.9)] backdrop-blur-md rounded-2xl border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 max-w-2xl w-full mx-4 flex flex-col h-[80vh]">
            <h3 className="text-2xl font-bold mb-4">Crop Profile Picture</h3>

            <div className="relative flex-1 mb-6 rounded-xl overflow-hidden bg-black/50">
              <Cropper
                image={tempImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                cropShape="round"
                showGrid={false}
                restrictPosition={false}
                minZoom={0.5}
              />
            </div>

            <div className="flex items-center gap-4 mb-6 px-4">
              <span className="text-sm font-medium text-foreground/80">
                Zoom
              </span>
              <input
                type="range"
                value={zoom}
                min={0.5}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary hover:bg-white/30 transition-colors"
              />
            </div>

            <div className="flex gap-4 justify-end">
              <Button
                variant="outline"
                size={"md"}
                className="rounded-3xl w-42"
                onClick={() => {
                  setShowCropper(false);
                  setTempImage(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCropSave}
                variant={"gradient"}
                className="w-42"
                size={"md"}
              >
                Apply Crop
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
