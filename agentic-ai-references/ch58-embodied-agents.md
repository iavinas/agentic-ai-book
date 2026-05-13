# Chapter 58: Embodied Agents and Robotics

## Core Thesis
Language-conditioned robot control: SayCan, RT-2, and sim-to-real transfer. Navigating physical spaces requires perception, planning, and safety.

## Key References

### Language-Conditioned Robotics
- **Ahn et al. (2022)** — "SayCan: Grounding Language in Robotic Affordances". https://arxiv.org/abs/2204.01691
- **Brohan et al. (2023)** — "RT-2: Vision-Language-Action Models". https://arxiv.org/abs/2307.15818
- **RT-X** — Cross-embodiment generalization. https://arxiv.org/abs/2310.08864

### Sim-to-Real
- **Tobin et al. (2017)** — "Domain Randomization for Transferring Deep Neural Networks". https://arxiv.org/abs/1703.06907
- **SAPIEN / MuJoCo / Isaac Sim** — Simulation environments.

### Agent Architectures
- **Perception modules** — Vision, depth, tactile sensing.
- **Action modules** — Low-level motor control, high-level skill execution.
- **World models** — Predicting consequences of actions.
- **Safety** — Collision avoidance, human proximity detection.

### Evaluation
- **ALFWorld** — Simulated embodied tasks. https://alfworld.github.io/
- **ScienceWorld** — Scientific experimentation. https://scienceworld.github.io/
- **Real-world robotics** — Success rate, safety incidents, task completion time.

## Cross-References
- **Previous**: Ch 57 (Creative Agents) — virtual domain.
- **Next**: Ch 59 (Game Agents) — simulated environments.
- **Related**: Ch 21 (Classical Planning) — TAMP for robotics.
- **Related**: Ch 18 (Hierarchical Planning) — SayCan planning.
