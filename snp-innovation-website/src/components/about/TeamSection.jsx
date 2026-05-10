/* ========================================
   TEAM & LEADERSHIP — About Page Section 2.6
   PDF: "Profile cards — photo + name + role + bio"
   4 members from PDF: CEO, COO, CTO, Strategic Mentor (Dr. Vijay Bhatkar)
   PDF NOTE: "This association is a major credibility asset — highlight it prominently."
   ======================================== */

import { Box, Container, Card, CardContent, Typography, Chip } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import StarIcon from '@mui/icons-material/Star'; // used in TeamCard mentor badge

const TeamSection = ({ teamData = [] }) => {

  // Fallback — exact bios from PDF 2.6
  const defaultTeam = [
    {
      id: 1,
      name: 'Mr. Saurabh Tiwari',
      shortName: 'Saurabh Tiwari',
      initials: 'ST',
      designation: 'Chief Executive Officer (CEO)',
      bio: "Visionary entrepreneur and education-technology leader, Saurabh drives SNP Innovation's overall strategy, growth, and stakeholder relationships. His deep passion for democratizing quality technical education has been the driving force behind SNP Innovation's expansion across EdTech, IT services, and innovation infrastructure.",
      image: 'https://picsum.photos/seed/ceo-saurabh-snp/400/420',
      linkedin: '#',
      gradient: 'linear-gradient(135deg,#1A3A8F,#2D5BE3)',
      tagColor: '#EFF6FF',
      tagText: '#1A3A8F',
      isMentor: false,
    },
    {
      id: 2,
      name: 'Mr. Nikhil Gujar',
      shortName: 'Nikhil Gujar',
      initials: 'NG',
      designation: 'Chief Operating Officer (COO)',
      bio: 'The operational backbone of SNP Innovation, Nikhil oversees end-to-end execution across all four verticals — from lab installations and supply chain management to IT resourcing operations and cross-vertical coordination. His attention to detail and systems-thinking ensure that every client engagement is delivered with precision and excellence.',
      image: 'https://picsum.photos/seed/coo-nikhil-snp/400/420',
      linkedin: '#',
      gradient: 'linear-gradient(135deg,#15803D,#22C55E)',
      tagColor: '#F0FDF4',
      tagText: '#15803D',
      isMentor: false,
    },
    {
      id: 3,
      name: 'Mr. Pratik Warjurkar',
      shortName: 'Pratik Warjurkar',
      initials: 'PW',
      designation: 'Chief Technology Officer (CTO)',
      bio: "A hands-on technologist and innovator, Pratik leads SNP Innovation's technology architecture across robotics, AI, automation, and embedded systems. He spearheads all R&D initiatives, product development, and technology integration across the company's verticals — transforming ideas into working solutions.",
      image: 'https://picsum.photos/seed/cto-pratik-snp/400/420',
      linkedin: '#',
      gradient: 'linear-gradient(135deg,#C2410C,#CC2020)',
      tagColor: '#FFF7ED',
      tagText: '#C2410C',
      isMentor: false,
    },
  ];

  const members = teamData.length > 0 ? teamData : defaultTeam;

  return (
    <Box
      sx={{
        width: '100%',
        py: { xs: 4, md: 7 },
        background: 'linear-gradient(135deg,#F8FAFC 0%,#EFF6FF 100%)',
      }}
    >
      <Container maxWidth="xl">

        {/* Section header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 5 } }}>
          <Typography sx={{ color: '#CC2020', fontWeight: 700, letterSpacing: '2px', fontSize: '12px', mb: 1 }}>
            THE TEAM
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, fontSize: { xs: '28px', md: '38px' }, color: '#0F172A', mb: 2 }}
          >
            Leadership & Mentorship
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 520, mx: 'auto', fontSize: '16px', mb: 3 }}>
            Visionary leaders and a world-renowned mentor driving innovation across all verticals.
          </Typography>
          <Box sx={{ width: 56, height: 4, background: 'linear-gradient(90deg,#1A3A8F,#CC2020)', borderRadius: 2, mx: 'auto' }} />
        </Box>

        {/* Team cards grid — 3 members: 1-col mobile, 3-col desktop */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: 3 }}>
          {members.map((member) => (
            <Box key={member.id} sx={{ display: "flex" }}>
              <TeamCard member={member} />
            </Box>
          ))}
        </Box>

      </Container>
    </Box>
  );
};

/* ── Individual team member card ── */
const TeamCard = ({ member }) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
        border: member.isMentor ? '2px solid #A855F7' : '1px solid #E2E8F0',
        borderRadius: '18px',
        overflow: 'hidden',
        transition: 'all 0.35s ease',
        boxShadow: member.isMentor ? '0 8px 32px rgba(126,34,206,0.15)' : 'none',
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: '0 24px 56px rgba(0,0,0,0.12)',
        },
        // Top accent
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '4px',
          background: member.gradient,
        },
        position: 'relative',
      }}
    >
      {/* Photo area with dummy image */}
      <Box
        sx={{
          width: '100%',
          height: '200px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={member.image}
          alt={member.shortName}
          loading="lazy"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
            '&:hover': { transform: 'scale(1.05)' },
          }}
        />
        {/* Gradient overlay at bottom */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '50%',
            background: `linear-gradient(0deg, rgba(0,0,0,0.6), transparent)`,
          }}
        />

        {/* Initials fallback badge (shown over image) */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 12, left: 16,
            width: 44, height: 44,
            borderRadius: '12px',
            background: member.gradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}
        >
          <Typography sx={{ fontWeight: 800, fontSize: '14px', color: 'white' }}>
            {member.initials}
          </Typography>
        </Box>

        {/* Mentor badge */}
        {member.isMentor && (
          <Chip
            icon={<StarIcon sx={{ fontSize: '14px !important', color: '#FDE68A !important' }} />}
            label="Strategic Mentor"
            size="small"
            sx={{
              position: 'absolute',
              top: 12, right: 12,
              background: 'rgba(126,34,206,0.85)',
              color: 'white',
              fontWeight: 700,
              fontSize: '10px',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          />
        )}
      </Box>

      {/* Card content */}
      <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Name */}
        <Typography
          sx={{ fontWeight: 800, fontSize: '16px', color: '#0F172A', mb: 0.5, lineHeight: 1.3 }}
        >
          {member.shortName}
        </Typography>

        {/* Designation chip */}
        <Chip
          label={member.designation}
          size="small"
          sx={{
            background: member.tagColor,
            color: member.tagText,
            fontWeight: 700,
            fontSize: '11px',
            height: '24px',
            borderRadius: '6px',
            mb: 2,
            alignSelf: 'flex-start',
            border: `1px solid ${member.tagText}33`,
          }}
        />

        {/* Bio — exact from PDF */}
        <Typography
          sx={{
            color: '#475569',
            fontSize: '13px',
            lineHeight: 1.75,
            flex: 1,
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 5,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {member.bio}
        </Typography>

        {/* LinkedIn link */}
        <Box
          component="a"
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            color: '#1A3A8F',
            fontWeight: 600,
            fontSize: '13px',
            textDecoration: 'none',
            borderTop: '1px solid #F1F5F9',
            pt: 2,
            transition: 'gap 0.3s ease',
            '&:hover': { gap: 1.5 },
          }}
        >
          <LinkedInIcon sx={{ fontSize: 18 }} />
          LinkedIn Profile →
        </Box>
      </CardContent>
    </Card>
  );
};

export default TeamSection;
